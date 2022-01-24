import Routes from "../models/RouteModel.js";


export const getRoutes = async(req, res) => {
    try {
        const routes = await Routes.findAll();
        res.json(routes);
    } catch (error) {
        console.log(error);
    }
}


export const createRoute = async(req, res) => {
    
    const {name,roleId, url, method } = req.body;

    
    try {
        await Routes.create({
            name:name,
            roleId:roleId,
            url:url,
            method:method
        });

        res.json({msg:`Routes ${name} berhasil ditambahkan !!`})
    } catch (error) {
        console.log(error);
    }
}