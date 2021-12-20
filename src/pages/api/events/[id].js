const {
    getEventByID, updateEvent, deleteEvent
} = require('../../../routeHandlers/eventHandler')

export default (req, res) => {
    const {id} = req.query

    if (req.method === 'GET') {
        getEventByID(id, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            if (!result) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    }

    else if(req.method === 'PUT'){
        var body = req.body
        body.id = id

        updateEvent(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                }) 
            }
            if (!result.affectedRows) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update event"
                })
            }
            console.log(result)
            return res.status(200).json({
                success: 1,
                message: "Updated successfully",
                data: result,
            })
        })
    }

    else if(req.method === 'DELETE'){
        deleteEvent(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!result.affectedRows) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "event deleted successfully"
            })
        })
    }

    else{
        return res.status(500).json({
            success: 0,
            message: "server side error"
        })
    }
}