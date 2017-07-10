all: out/iso3166-dist.csv out/stores.csv out/stores.json

out/iso3166-dist.csv: convert iso3166.csv distances.csv
	cat iso3166.csv distances.csv | ./convert > out/iso3166-dist.csv

out/stores.csv: prepare amazon-store-countries override.csv out/iso3166-dist.csv
	./prepare amazon-store-countries out/iso3166-dist.csv override.csv | sort > out/stores.csv

out/stores.json: tojson out/stores.csv
	./tojson out/stores.csv > out/stores.json
