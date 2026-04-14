export const getLinks = (pathname) => {
    let links = [];

    if (pathname === '/login') {
      links = links.concat({name: 'Registro', to: '/signup'});
      links = links.concat({name: 'Inicio', to: '/'});
    }

    if (pathname === '/signup') {
      links = links.concat({name: 'Inicio', to: '/'});
      links = links.concat({name: 'Login', to: '/login'});
    }

    if (pathname === '/') {
      links = links.concat({name: 'Login', to: '/login'});
      links = links.concat({name: 'Registro', to: '/signup'});
    }

    return links;
}