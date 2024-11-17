export interface ComponentSheet {
    id: string;
    name: string;
    type: string;
    description: string;
    system: string;
    environment: "dev" | "qa" | "pdn";
    awsOrgLink?: string;
    awsResourceLink?: string;
    logsLink?: string;
    repoLink?: string;
    collectionLink?: string;
    relevantInfo?: string;
    tags: string[];
}
  