export interface headerProps {
    mobileNavSet: () => void;
}
export interface mobileNavProps {
    mobileNav: boolean;
    mobileNavClose: () => void;
}
export interface registerProps {
    name: string,
    email: string,
    password: string,
    password2: string
}
export interface loginProps {
    email: string,
    password: string,
    token: string
},
export interface updateProps {
    email: string,
    name: string,
    city: string,
    address: string,
    userId: string,
    header: any 
}
export interface errorsProps {
    name?: string,
    email?: string,
    password?: string,
    password2?: string,
    city?: string,
    address?: string
}
export interface userProps {
    name?: string,
    email?: string,
    id?: string | number,
    token?: string,
    city?: string,
    address?: string,
}
export interface loadingProps {
    text: string,
    width: string,
    height: string,
    left: string,
    top: string
}
export interface preloaderProps {
    width: string,
    height: string,
    left: string,
    top: string
}