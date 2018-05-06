
export class User {

    public name: string = undefined;
    public email: string = undefined;
    public userID: string = undefined;
    public accessToken: string = undefined;
    public profilePicture: string = undefined;
    public profilePictureID: string = undefined;

    static parse(json: string) {
        var data = JSON.parse(json);
         return new User(data.name, data.email, data.userID, data.accessToken, data.profilePicture, data.profilePictureID);
    }
    constructor(
        name: string,
        email: string,
        userID: string,
        accessToken: string,
        profilePicture: string,
        profilePictureID: string
    ) {
            this.name = name;
            this.email = email;
            this.userID = userID;
            this.accessToken = accessToken;
            this.profilePicture = profilePicture;
            this.profilePictureID = profilePictureID;
        }
}
