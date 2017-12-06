export interface UploadInterface {
    file: string
    upload(file: string): Promise<string>;
}
