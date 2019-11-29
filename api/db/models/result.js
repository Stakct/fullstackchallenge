module.exports = (sequelize, type) => {
    return sequelize.define('Result', {
        "Id": {
            primaryKey: true,
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        "Status": {
            type: type.ENUM('Queued', 'In Progress', 'Success', 'Failure'),
            allowNull: true
        },
        "RepositoryName": {
            type: type.STRING,
            allowNull: true
        },
        "Findings": {
            type: type.JSONB,
            allowNull: true
        },
        "QueuedAt": {
            type: type.DATE,
            allowNull: true
        },
        "ScanningAt": {
            type: type.DATE,
            allowNull: true
        },
        "FinishedAt": {
            type: type.DATE,
            allowNull: true
        }
    })
}
