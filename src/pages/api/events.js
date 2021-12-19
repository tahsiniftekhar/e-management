const {getEvents, createEvent} = require('../../routeHandlers/eventHandler')

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
      externalResolver: true,
    },
  }
  
export default (req, res) => {
    if (req.method === 'GET') {
        getEvents((err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            }) 
        })
    }

    else if(req.method === 'POST') {
        const body = req.body
        createEvent(body, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
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