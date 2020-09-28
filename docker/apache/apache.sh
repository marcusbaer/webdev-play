docker run --rm --name apache -v $(pwd)/public:/app -p 80:8080 -p 443:8443 bitnami/apache:latest
