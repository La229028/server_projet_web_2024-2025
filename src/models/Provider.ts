
export class Provider {
    protected logo_Path: string;
    protected provider_Name: string;
    protected provider_ID: number;

    constructor(provider_ID: number, provider_Name: string, logo_Path: string) {
        this.logo_Path = logo_Path;
        this.provider_Name = provider_Name;
        this.provider_ID = provider_ID;
    }
    static fromJSON (data: any) : Provider {
        return new Provider(data.logo_Path, data.provider_Name, data.provider_ID );
    }
}