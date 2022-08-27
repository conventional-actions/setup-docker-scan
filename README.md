# setup-docker-scan

A GitHub Action for setting docker scan.

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/setup-docker-scan@v1
```

### Inputs

| Name           | Default  | Description                           |
|----------------|----------|---------------------------------------|
| `scan-version` | `latest` | the version of docker scan to install |

### Outputs

No outputs

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: conventional-actions/setup-docker-scan@v1
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
