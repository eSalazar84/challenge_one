export const URL_user = 'http://localhost:3000/user';

const controller = new AbortController();

export const getAllUser = async (URL_user: string) => {
    try {
        const res = await fetch(URL_user, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
        });
        if (!res.ok) throw new Error('Response not OK');
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const getUserById = async (id: string) => {
    try {
        const res = await fetch(`${URL_user}${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
        });
        if (!res.ok) throw new Error('Response not OK');
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const createUser = async (user) => {
    try {
        const res = await fetch(URL_user, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!res.ok) throw new Error('Response not OK');
        const parsed = await res.json();
        window.location.reload(); //refresca la pagina para mostrar el nuevo user creado
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const deleteUser = async (user) => {
    try {
        const res = await fetch(`${URL_user}${user.id}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        });
        const parsed = await res.json();
        window.location.reload();
        return parsed;
    } catch (err) {
        throw err;
    }
}

export const updateUserById =async (id,updatedUser) => {
    try {
        const res = await fetch(`${URL_user}${id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(updatedUser)
        });
        if (!res.ok) throw new Error('Response not OK');
        const parsed = await res.json();
        return parsed;
    } catch (err) {
        throw err        
    }    
}

export const getAuthByUser =async (user) => {
    const res = await getAllUser(URL_user);
    const list = res.filter(list => list.user === user);
    if (!list.length) throw new Error(`Not found ${user} in registry.`);
    return list;    
}