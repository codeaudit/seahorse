create table "datasourcemanager"."datasource" (
    "id" UUID NOT NULL PRIMARY KEY,
    "ownerId" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "creationDateTime" TIMESTAMP NOT NULL,
    "visibility" VARCHAR NOT NULL,
    "downloadUri" VARCHAR,
    "datasourceType" VARCHAR NOT NULL,
    "jdbcUrl" VARCHAR,
    "jdbcDriver" VARCHAR,
    "jdbcTable" VARCHAR,
    "jdbcQuery" VARCHAR,
    "externalFileUrl" VARCHAR,
    "hdfsPath" VARCHAR,
    "libraryPath" VARCHAR,
    "fileFormat" VARCHAR,
    "fileCsvIncludeHeader" BOOLEAN,
    "fileCsvConvert01ToBoolean" BOOLEAN,
    "fileCsvSeparatorType" VARCHAR,
    "fileCsvSeparator" VARCHAR,
    "googleSpreadsheetId" VARCHAR,
    "googleServiceAccountCredentials" VARCHAR
)