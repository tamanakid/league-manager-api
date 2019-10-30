module.exports = {

  notFound: (res) => {
    res.status(404).send({
      message: 'The resource queried was not found'
    });
  },
	
	serverError: (res) => {
    res.status(500).send({
      message: 'There was a problem with the server'
    });
	},
	
	dbError: (res) => {
    res.status(500).send({
      message: 'There was a problem with a database operation'
    });
  }

};