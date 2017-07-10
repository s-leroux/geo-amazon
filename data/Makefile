all: out/stores.json

out/iso3166-dist.csv: convert iso3166.csv distances.csv
	./convert iso3166.csv distances.csv > out/iso3166-dist.csv

out/stores.csv: prepare amazon-store-countries override.csv out/iso3166-dist.csv
	./prepare amazon-store-countries out/iso3166-dist.csv override.csv > out/stores.csv

out/stores.json: tojson amazon-store-per-country.csv
	./tojson amazon-store-per-country.csv > out/stores.json
