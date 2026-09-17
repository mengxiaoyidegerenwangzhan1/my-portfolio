"""Generate web delivery assets without modifying the source artwork (requires Pillow)."""
import json
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
assets = root / 'public/assets'
manifest = {}
for source in sorted(assets.rglob('*')):
    if source.suffix.lower() not in ('.png', '.jpg'):
        continue
    relative = source.relative_to(assets)
    image = ImageOps.exif_transpose(Image.open(source))
    is_gallery = len(relative.parts) > 1
    limit = 2560 if is_gallery else (1600 if '-cover' in source.stem else 1920)
    if source.stem == 'profile-id-photo':
        limit = 720
    image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
    target = assets / 'optimized' / relative.with_suffix('.webp')
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, 'WEBP', quality=90 if is_gallery else 86, method=6,
               lossless=source.stem == 'contact-wechat-qr')
    delivery = source if is_gallery and target.stat().st_size >= source.stat().st_size else target
    entry = {'src': '/assets/' + delivery.relative_to(assets).as_posix(),
             'width': image.width, 'height': image.height}
    if '-cover' in source.stem or is_gallery:
        small = image.copy()
        small.thumbnail((800, 800), Image.Resampling.LANCZOS)
        small_target = target.with_stem(target.stem + '-800')
        small.save(small_target, 'WEBP', quality=90 if is_gallery else 86, method=6)
        entry['small'] = '/assets/' + small_target.relative_to(assets).as_posix()
        entry['smallWidth'] = small.width
    manifest['/assets/' + relative.as_posix()] = entry
(root / 'src/image-assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
original = sum((root / 'public' / key.lstrip('/')).stat().st_size for key in manifest)
optimized = sum((root / 'public' / entry['src'].lstrip('/')).stat().st_size for entry in manifest.values())
print(f'{len(manifest)} images: {original:,} -> {optimized:,} bytes ({1-optimized/original:.1%} smaller)')
