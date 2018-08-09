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
        ENV:
            NAME: Avaneesh
            ROLE: Developer
            ANOTHER_ENV_VAR: Hello World!
## Documentation ##
Documentation is provided by serverless-aws-documentaion plugin which generates API doc using serveless.yml file
