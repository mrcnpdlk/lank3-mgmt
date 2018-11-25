declare module App {

    interface Item {
        name: string;
        value: number;
    }

    interface IDevice {
        id: string;
        host: string;
        login: string | null;
        password: string | null;
        ver: number;
        token: string;
    }

}
