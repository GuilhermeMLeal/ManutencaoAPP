
interface UserDTO {
    Id: number;
    Name: string;
    Email: string;
    Username: string;
    Password: string;
    Roles: RoleDTO[];
}
  
interface RoleDTO {
    Id: number;
    Name: string;
}

interface SquadDTO {
    Id: number;
    Name: string;
    Description: string;
}

interface UserLoginDTO {
    Username: string;
    Password: string;
}