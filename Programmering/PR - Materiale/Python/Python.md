---
Up: "[[PR - Materiale]]"
---
```python
# Hent brugerens navn og alder
navn = input("Hvad er dit navn? ")
alder = int(input("Hvor gammel er du? "))

# Betinget logik
if alder >= 18:
	print(f"Hej {navn}, du er myndig.")
else:
	aar_tilbage = 18 - alder
	print(f"Hej {navn}, du bliver myndig om {aar_tilbage} år.")
```
