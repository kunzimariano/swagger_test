/*jshint -W069 */
/**
 * This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.
 * @class Test
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Test = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Test(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://petstore.swagger.io/v2';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    Test.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });
    };

    /**
     * Set Token
     * @method
     * @name Test#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     *
     */
    Test.prototype.setToken = function(value, headerOrQueryName, isQuery) {
        this.token.value = value;
        this.token.headerOrQueryName = headerOrQueryName;
        this.token.isQuery = isQuery;
    };

    /**
     * Add a new pet to the store
     * @method
     * @name Test#addPet
     * @param {} body - Pet object that needs to be added to the store
     * 
     */
    Test.prototype.addPet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];
        headers['Content-Type'] = ['application/json,application/xml'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Update an existing pet
     * @method
     * @name Test#updatePet
     * @param {} body - Pet object that needs to be added to the store
     * 
     */
    Test.prototype.updatePet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];
        headers['Content-Type'] = ['application/json,application/xml'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Multiple status values can be provided with comma separated strings
     * @method
     * @name Test#findPetsByStatus
     * @param {array} status - Status values that need to be considered for filter
     * 
     */
    Test.prototype.findPetsByStatus = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/findByStatus';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['status'] !== undefined) {
            queryParameters['status'] = parameters['status'];
        }

        if (parameters['status'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: status'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Muliple tags can be provided with comma separated strings. Use         tag1, tag2, tag3 for testing.
     * @method
     * @name Test#findPetsByTags
     * @param {array} tags - Tags to filter by
     * 
     */
    Test.prototype.findPetsByTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/findByTags';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['tags'] !== undefined) {
            queryParameters['tags'] = parameters['tags'];
        }

        if (parameters['tags'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: tags'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a single pet
     * @method
     * @name Test#getPetById
     * @param {integer} petId - ID of pet to return
     * 
     */
    Test.prototype.getPetById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/{petId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates a pet in the store with form data
     * @method
     * @name Test#updatePetWithForm
     * @param {integer} petId - ID of pet that needs to be updated
     * @param {string} name - Updated name of the pet
     * @param {string} status - Updated status of the pet
     * 
     */
    Test.prototype.updatePetWithForm = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/{petId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];
        headers['Content-Type'] = ['application/x-www-form-urlencoded'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            form['name'] = parameters['name'];
        }

        if (parameters['status'] !== undefined) {
            form['status'] = parameters['status'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes a pet
     * @method
     * @name Test#deletePet
     * @param {string} apiKey - This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.
     * @param {integer} petId - Pet id to delete
     * 
     */
    Test.prototype.deletePet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/{petId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['apiKey'] !== undefined) {
            headers['api_key'] = parameters['apiKey'];
        }

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * uploads an image
     * @method
     * @name Test#uploadFile
     * @param {integer} petId - ID of pet to update
     * @param {string} additionalMetadata - Additional data to pass to server
     * @param {file} file - file to upload
     * 
     */
    Test.prototype.uploadFile = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/pet/{petId}/uploadImage';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['multipart/form-data'];

        path = path.replace('{petId}', parameters['petId']);

        if (parameters['petId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: petId'));
            return deferred.promise;
        }

        if (parameters['additionalMetadata'] !== undefined) {
            form['additionalMetadata'] = parameters['additionalMetadata'];
        }

        if (parameters['file'] !== undefined) {
            form['file'] = parameters['file'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a map of status codes to quantities
     * @method
     * @name Test#getInventory
     * 
     */
    Test.prototype.getInventory = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/store/inventory';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        headers['Accept'] = ['application/json'];

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Place an order for a pet
     * @method
     * @name Test#placeOrder
     * @param {} body - order placed for purchasing the pet
     * 
     */
    Test.prototype.placeOrder = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/store/order';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * For valid response try integer IDs with value >= 1 and <= 10.         Other values will generated exceptions
     * @method
     * @name Test#getOrderById
     * @param {integer} orderId - ID of pet that needs to be fetched
     * 
     */
    Test.prototype.getOrderById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/store/order/{orderId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{orderId}', parameters['orderId']);

        if (parameters['orderId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: orderId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors
     * @method
     * @name Test#deleteOrder
     * @param {integer} orderId - ID of the order that needs to be deleted
     * 
     */
    Test.prototype.deleteOrder = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/store/order/{orderId}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{orderId}', parameters['orderId']);

        if (parameters['orderId'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: orderId'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#createUser
     * @param {} body - Created user object
     * 
     */
    Test.prototype.createUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates list of users with given input array
     * @method
     * @name Test#createUsersWithArrayInput
     * @param {} body - List of user object
     * 
     */
    Test.prototype.createUsersWithArrayInput = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/createWithArray';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Creates list of users with given input array
     * @method
     * @name Test#createUsersWithListInput
     * @param {} body - List of user object
     * 
     */
    Test.prototype.createUsersWithListInput = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/createWithList';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Logs user into the system
     * @method
     * @name Test#loginUser
     * @param {string} username - The user name for login
     * @param {string} password - The password for login in clear text
     * 
     */
    Test.prototype.loginUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/login';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters['username'] !== undefined) {
            queryParameters['username'] = parameters['username'];
        }

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters['password'] !== undefined) {
            queryParameters['password'] = parameters['password'];
        }

        if (parameters['password'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: password'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Logs out current logged in user session
     * @method
     * @name Test#logoutUser
     * 
     */
    Test.prototype.logoutUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/logout';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Get user by user name
     * @method
     * @name Test#getUserByName
     * @param {string} username - The name that needs to be fetched. Use user1 for testing. 
     * 
     */
    Test.prototype.getUserByName = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/{username}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#updateUser
     * @param {string} username - name that need to be updated
     * @param {} body - Updated user object
     * 
     */
    Test.prototype.updateUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/{username}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * This can only be done by the logged in user.
     * @method
     * @name Test#deleteUser
     * @param {string} username - The name that needs to be deleted
     * 
     */
    Test.prototype.deleteUser = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/user/{username}';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        headers['Accept'] = ['application/xml', 'application/json'];

        path = path.replace('{username}', parameters['username']);

        if (parameters['username'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: username'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return Test;
})();

exports.Test = Test;