export interface UploadInterface {

    file: string

    config(config: any): void
    upload(file: string): Promise<string>
}
