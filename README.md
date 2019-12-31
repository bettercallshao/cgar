![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/bettercallshao/cgar)

# cgar
reCAPTCHA gated archive retriever

# Setup
## Make a config file

`./secret/config.yaml`

```
RECAPTCHA_SITE_KEY: "..."
RECAPTCHA_SECRET_KEY: "..."
downloads:
  - id: "example"
    bucket: "..."
    key: "..."
    accessKeyId: "..."
    secretAccessKey: "..."
    endpoint: "..."
```

Only s3 compatible object stores are supported. I use minio.

## Start with docker compose

```
docker-compose up
```

## Visit

`localhost:8080/ready`

`localhost:8080/download/example`

## Kubernetes

* Make a config map with `config.yaml`
* Mount the config map in the pod
* Set `CONFIG_PATH` to the path to `config.yaml`
