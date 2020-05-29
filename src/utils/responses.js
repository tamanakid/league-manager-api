module.exports = {

  notFound: (res) => {
    res.status(404).json({
      message: 'The resource queried was not found'
    });
  },
	
	serverError: (res) => {
    res.status(500).json({
      message: 'There was a problem with the server'
    });
	},
	
	dbError: (res) => {
    res.status(500).json({
      message: 'There was a problem with a database operation'
    });
  }

};