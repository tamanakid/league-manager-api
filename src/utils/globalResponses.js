const resNames = {
	GLOBAL_NOT_FOUND: "GLOBAL_NOT_FOUND",
	GLOBAL_SERVER_ERROR: "GLOBAL_SERVER_ERROR",
	GLOBAL_DB_ERROR: "GLOBAL_DB_ERROR",
};


const responses = {

  [resNames.GLOBAL_NOT_FOUND]: (res) => {
    res.status(404).json({
      message: 'The resource queried was not found'
    });
  },
	
	[resNames.GLOBAL_SERVER_ERROR]: (res) => {
    res.status(500).json({
      message: 'There was a problem with the server'
    });
	},
	
	[resNames.GLOBAL_DB_ERROR]: (res) => {
    res.status(500).json({
      message: 'There was a problem with a database operation'
    });
  }

};

module.exports = { responses, resNames };