const EnumOperationStatus = {
    /// <summary>
    /// No status
    /// </summary>
    NONE: 0,
    /// <summary>
    /// The operation was successfully executed.
    /// </summary>
    SUCCESS: 1,
    /// <summary>
    /// The submitted BiometricXml was not correctly formatted.
    /// </summary>
    INVALID_ACCESS: 2,
    /// <summary>
    /// A system license limitation prevented your request from being fulfilled. Please contact your vendor for assistance.
    /// </summary>
    LICENSE_EXCEED: 3,
    /// <summary>
    /// An unexpected system error was encountered. Please contact your vendor for assistance.
    /// </summary>
    ENGINE_EXCEPTION: 4,
    /// <summary>
    /// An unexpected API error was encountered. Please contact your vendor for assistance.
    /// </summary>
    CLOUD_API_ERROR: 5,
}

module.exports = { EnumOperationStatus };