from PIL import Image
image = Image.open("datasets/raw/fresh_apple/rotated_by_15_Screen Shot 2018-06-08 at 4.59.36 PM.png")
# image.show()

print("Image:", image)
print("Width:",image.width)
print("height:",image.height)
print("format:",image.format)
print("mode:",image.mode)