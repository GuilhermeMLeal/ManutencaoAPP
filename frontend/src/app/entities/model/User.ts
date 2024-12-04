
interface Role {
    Id: number;
    Name: string;
    UserRoles: UserRole[];
  }

interface Squad {
    Id: number;
    Name: string;
    Description: string;
    UserSquads: UserSquad[];
}

interface User {
    Id: number;
    Name: string;
    Email: string;
    Username: string;
    Password: string;
    UserRoles: UserRole[];
    UserSquads: UserSquad[];
}

interface UserRole {
    UserId: number;
    User: User;
    RoleId: number;
    Role: Role;
}

interface UserSquad {
    UserId: number;
    User: User;
    SquadId: number;
    Squad: Squad;
}
  