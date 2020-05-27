// This is hardcoded as of now, this should ideally be injected at angular build in prod systems
export class ApiEndpoint {
    readonly baseUrl: string = "http://localhost:5000/modelling/";

    generateUrl(urlFragment: string) {
        return this.baseUrl + urlFragment;
    }

}