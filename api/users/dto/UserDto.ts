export default interface UserDto {
    uuid: string;
    email: string;
    photo: string;
    created_at: string;
    updated_at: string;
    banned: boolean;
    deleted: boolean;
    hashedRefreshToken: string;
    city: {
        uuid: string;
        title: string;
    };
    role: {
        uuid: string;
        current: string;
    };
}