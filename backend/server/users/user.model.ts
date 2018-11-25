import {pbkdf2Sync, randomBytes} from "crypto";
import {sign} from "jsonwebtoken";

// Define some public methods for our model
export default class User {
    private _id: string;
    private salt: string;
    private hash: string;

    private _email: string;

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    // Create a salt and hash from the password
    public setPassword(password: string) {
        this.salt = randomBytes(16).toString("hex");
        this.hash = pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
    }

    // Check if hashes match
    public isPasswordValid(password: string): boolean {
        const hash = pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
        return this.hash === hash;
    }

    // Generate access token for 30 minutes
    public generateJwt(): { token: string; expiry: Date } {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 30);

        const token = sign({
            _id: this._id,
            email: this._email,
            exp: Math.round(expiry.getTime() / 1000),
        }, process.env.AUTH_SHARED_SECRET);

        return {token, expiry};
    }
}
