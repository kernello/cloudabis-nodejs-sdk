module.exports = {

    /**
     * Returns API token object if given app key, secret key is correct otherwise return the proper reason
     */
    GetToken: (config) => {
        var request = require("request");
 
        var options = {
            method: 'POST',
            url: config.CloudABIS_API_URL + 'token',
            headers:
            {
                'content-type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                username: config.CloudABISAppKey,
                password: config.CloudABISSecretKey,
                grant_type: 'password'
            }
        };
 
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                // if (error) throw new Error(error);
                if (error) reject(error);
                else resolve(body);            
            });
        });        
    },

    /// <summary>
    /// Determine if a member ID already has biometric data enrolled.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>IsRegistered: YES - There is biometric data enrolled with the requested Member ID.</br>
    /// <br>IsRegistered: NO - There is not any biometric data enrolled with the requested ID.</br>
    /// <para>General OperationResult values:</para>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    IsRegister: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/IsRegistered',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' + CloudABISBiometricRequest.token
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                RegistrationID: CloudABISBiometricRequest.registrationID
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Enroll a member's biometric data.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>Register: SUCCESS - Enrollment successful. (The Member ID and associated biometric data added to system.)</br>
    /// <br>Register: FAILED - Enrollment failed.</br>
    /// <br>IsRegistered: YES - There is biometric data enrolled with the requested Member ID.</br>
    /// <br>Register: POOR_IMAGE_QUALITY - The submitted iris image(s) were not good enough quality to fulfill the request.</br>
    /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
    /// <para>General OperationResult values(FingerVein,Face,Iris):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// <para>General OperationResult values(FingerPrint):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
    /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
    /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
    /// <param name="BiometricXml">The biometric template with xml formatting</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    Register: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Register',
            headers: 
                {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + CloudABISBiometricRequest.token
                },
            body: '{\r\n  "CustomerKey": "'+CloudABISBiometricRequest.config.CloudABISCustomerKey+'",\r\n  "EngineName": "'+CloudABISBiometricRequest.config.ENGINE_NAME+'",\r\n  "RegistrationID": "'+CloudABISBiometricRequest.registrationID+'",\r\n  "Format": "'+CloudABISBiometricRequest.config.TEMPLATE_FORMAT+'",\r\n  "BiometricXml": '+CloudABISBiometricRequest.templateXML+'\r\n}' 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                // if (error) throw new Error(error);
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Identify a member through biometric match, by comparing against all enrolled biometric records.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
    /// <br>Identify: NO_MATCH_FOUND - No match found. (No enrolled members matched against the submitted biometric data.)</br>
    /// <br>Identify: POOR_IMAGE_QUALITY - The submitted face image(s) were not good enough quality to fulfill the request.</br>
    /// <para>General OperationResult values(FinverVein, Face, Iris):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// <para>General OperationResult values(FingerPrint):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
    /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
    /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
    /// <param name="BiometricXml">The biometric template with xml formatting</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    Identify: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Identify',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' +  CloudABISBiometricRequest.token 
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                Format: CloudABISBiometricRequest.config.TEMPLATE_FORMAT,
                BiometricXml: CloudABISBiometricRequest.templateXML 
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                // if (error) throw new Error(error);
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Delete an enrolled member ID and its associated biometric data.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>DeleteID: DS - Deletion successful. (The Member ID and associated biometric data removed from system.)</br>
    /// <br>DeleteID: DF - Deletion failed.</br>
    /// <br>DeleteID: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
    /// <para>General OperationResult values:</para>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    RemoveID: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/RemoveID',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' + CloudABISBiometricRequest.token 
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                RegistrationID: CloudABISBiometricRequest.registrationID
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                // if (error) throw new Error(error);
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Change the member ID associated with an existing enrollment to a new ID.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>ChangeID: CS - Change of ID successful. (The Member ID was changed to the specified new ID.)</br>
    /// <br>ChangeID: CF - Change of ID failed.</br>
    /// <br>ChangeID: ID_NOT_EXIST - The Member ID intent for change doesn't exist in the system.</br>
    /// <br>IsRegistered: YES - There is biometric data enrolled with the requested New Member ID.</br>
    /// <para>General OperationResult values:</para>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="NewRegistrationID">The new unique identifier (Member ID) that the existing ID will be changed to.</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    ChangeID: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/ChangeID',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' + CloudABISBiometricRequest.token
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                RegistrationID: CloudABISBiometricRequest.RegistrationID,
                NewRegistrationID: CloudABISBiometricRequest.NewRegistrationID
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                // if (error) throw new Error(error);
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Verify against one member's enrolled biometric data.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>Verify: VS - Verification successful. (The submitted biometric data matched the requested member's enrolled biometric data.)</br>
    /// <br>Verify: VF - Verification failed. (The submitted biometric data did not match the requested member's enrolled biometric data.)</br>
    /// <br>Verify: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
    /// <br>Verify: POOR_IMAGE_QUALITY - The submitted fingerprint image(s) were not good enough quality to fulfill the request.</br>
    /// <para>General OperationResult values(FinverVein, Face, Iris):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// <para>General OperationResult values(FingerPrint):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
    /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
    /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
    /// <param name="BiometricXml">The biometric template with xml formatting</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    Verify: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Verify',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' + CloudABISBiometricRequest.token
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                RegistrationID: CloudABISBiometricRequest.registrationID,
                Format: CloudABISBiometricRequest.config.TEMPLATE_FORMAT,
                BiometricXml: CloudABISBiometricRequest.templateXML
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) reject(error);
                else resolve(body);            
            });
        });
    },

    /// <summary>
    /// Update the enrolled biometric data of a member.
    /// <para>Operation-specific OperationResult values:</para>
    /// <br>Update: SUCCESS - Update successful. (The biometric data associated with requested Member ID was updated in system.)</br>
    /// <br>Update: FAILED - Update Failed.</br>
    /// <br>Update: ID_NOT_EXIST - The Member ID doesn't exist in the system.</br>
    /// <br>Update: POOR_IMAGE_QUALITY - The submitted iris image(s) were not good enough quality to fulfill the request.</br>
    /// <br>Identify: MATCH_FOUND - Match found. (The submitted biometric data matched that of an enrolled member.)</br>
    /// <para>General OperationResult values(FingerVein,Face,Iris):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system.Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// <para>General OperationResult values(FingerPrint):</para>
    /// <br>INVALID_TEMPLATE: The submitted BiometricXml was not correctly formatted.</br>
    /// <br>INVALID_ANSI_TEMPLATE: The submitted template in BiometricXml was not valid ANSI template.</br>
    /// <br>INVALID_ISO_TEMPLATE: The submitted template in BiometricXml was not valid ISO template.</br>
    /// <br>INVALID_ICS_TEMPLATE: The submitted template in BiometricXml was not valid ICS template.</br>
    /// <br>CUSTOMER_INFO_NOT_FOUND: The specified CustomerKey was not found in the system. Please contat your vendor for assistance.</br>
    /// <br>INVALID_ENGINE: The specified EngineName was not valid.</br>
    /// <br>INVALID_REQUEST: The submitted request was not correctly formatted.</br>
    /// <br>LICENSE_ERROR: A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.</br>
    /// <br>INTERNAL_ERROR: An unexpected system error was encountered. Please contact your vendor for assistance.</br>
    /// <br>CACHE_NOT_AVAILABLE: The requested record is not available in the system. Please contact your vendor for assistance.</br>
    /// </summary>
    /// <param name="CustomerKey">Customer-specific key provided by the vendor.</param>
    /// <param name="EngineName">The engine name for fingerprint biometrics is "FPFF02". The engine name for fingervein biometrics is "FVHT01"The engine name for face biometrics is "FACE01".The engine name for iris biometrics is "IRIS01".</param>
    /// <param name="RegistrationID">The unique identifier (Member ID) of the biometric enrollment that the requested operation will be performed on.</param>
    /// <param name="Format">The format of template. It might be ISO/ANSI/ICS. This parameter is need during passing the template.Required only FingerPrint engine</param>
    /// <param name="BiometricXml">The biometric template with xml formatting</param>
    /// <param name="Token">API authenticate token</param>
    /// <returns></returns>
    Update: (CloudABISBiometricRequest) => {
        var request = require("request");

        var options = { 
            method: 'POST',
            url: CloudABISBiometricRequest.config.CloudABIS_API_URL + 'api/Biometric/Update',
            headers: 
            {
                'content-type': 'application/json',
                authorization: 'Bearer ' + CloudABISBiometricRequest.token
            },
            body: 
            { 
                CustomerKey: CloudABISBiometricRequest.config.CloudABISCustomerKey,
                EngineName: CloudABISBiometricRequest.config.ENGINE_NAME,
                RegistrationID: CloudABISBiometricRequest.registrationID,
                Format: CloudABISBiometricRequest.config.TEMPLATE_FORMAT,
                BiometricXml: CloudABISBiometricRequest.templateXML
            },
            json: true 
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) reject(error);
                else resolve(body);            
            });
        });
    }
}