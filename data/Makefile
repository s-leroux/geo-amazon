all: out/stores.json out/countries.json

out/stores.json: storetojson amazon-stores.csv
	./storetojson amazon-stores.csv > out/stores.json

out/countries.json: countrytojson amazon-store-per-country.csv
	./countrytojson amazon-store-per-country.csv > out/countries.json
