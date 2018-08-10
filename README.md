# Testing deployment setup for serverless #
Setup three AWS profiles in you local

        teamid-experiment # To be removed . For experiments only
        teamid-dev # change to Development AWS Profile
        teamid-test # change to Testing AWS Profile
        teamid-prod # change to Production AWS Profile
## Environment config ##
Environment variables are set using "env-STAGE.yml" file
For example for development stage "env-development.yml" file will be loaded
File containing environment variables will have all env vars under top level ENV object
        # Environment variables file
        ENV:
            NAME: Avaneesh
            ROLE: Developer
            ANOTHER_ENV_VAR: Hello World!
Secrets like API keys and JWT secret key etc MUST be provided in secret-STAGE.yml file which is not included in this
repository. This file is kept in the same directory where env-STAGE.yml is kept.
Secrets have to be referenced in env-STAGE.yml file from this secrets-STAGE.yml file to avoid adding secrets in the repo.

## Documentation ##
Documentation is provided by serverless-aws-documentaion plugin which generates API doc using serveless.yml file.
To download the documentation
                        serverless deploy
                        serverless downloadDocumentation --outputFileName=./docs/swagger.json
This will download swagger definitions file, which we can explore and edit using swagger
