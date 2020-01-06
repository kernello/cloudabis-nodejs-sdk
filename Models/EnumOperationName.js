/// <summary>
/// Biometric operations
/// </summary>
module.exports = {
    /// <summary>
    /// Not a valid operation.
    /// </summary>
    NONE: 0,
    /// <summary>
    /// Determine if a member ID already has biometric data enrolled.
    /// </summary>
    IsRegistered: 1,
    /// <summary>
    /// Enroll a member's biometric data.
    /// </summary>
    Register: 2,
    /// <summary>
    /// Identify a member through biometric match, by comparing against all enrolled biometric records.
    /// </summary>
    Identify: 3,
    /// <summary>
    /// Verify against one member's enrolled biometric data.
    /// </summary>
    Verify: 4,
    /// <summary>
    /// Update the enrolled biometric data of a member.
    /// </summary>
    Update: 5,
    /// <summary>
    /// Change the member ID associated with an existing enrollment to a new ID.
    /// </summary>
    ChangeID: 6,
    /// <summary>
    /// Delete an enrolled member ID and its associated biometric data.
    /// </summary>
    DeleteID: 7
}