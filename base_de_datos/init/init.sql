CREATE DATABASE SentinelPayDb;
GO

USE SentinelPayDb;
GO

-- =========================
-- Roles
-- =========================
CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(200) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- =========================
-- Users
-- =========================
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    RoleId INT NOT NULL,
    FullName NVARCHAR(120) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Users_Roles
        FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
);
GO

-- =========================
-- Customers
-- =========================
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(120) NOT NULL,
    Email NVARCHAR(150) NULL,
    Phone NVARCHAR(30) NULL,
    Country NVARCHAR(80) NOT NULL,
    RiskLevel NVARCHAR(20) NOT NULL DEFAULT 'LOW',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    Status NVARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT CK_Customers_RiskLevel
        CHECK (RiskLevel IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),

    CONSTRAINT CK_Customers_Status
        CHECK (Status IN ('ACTIVE', 'INACTIVE', 'BLOCKED'))
);
GO

-- =========================
-- Accounts
-- =========================
CREATE TABLE Accounts (
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    AccountNumber NVARCHAR(30) NOT NULL UNIQUE,
    AccountType NVARCHAR(30) NOT NULL DEFAULT 'SAVINGS',
    Balance DECIMAL(18,2) NOT NULL DEFAULT 0,
    Currency NVARCHAR(10) NOT NULL DEFAULT 'GTQ',
    Status NVARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Accounts_Customers
        FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId),

    CONSTRAINT CK_Accounts_Status
        CHECK (Status IN ('ACTIVE', 'INACTIVE', 'BLOCKED')),

    CONSTRAINT CK_Accounts_Type
        CHECK (AccountType IN ('SAVINGS', 'CHECKING', 'CREDIT'))
);
GO

-- =========================
-- Fraud Rules
-- =========================
CREATE TABLE FraudRules (
    RuleId INT IDENTITY(1,1) PRIMARY KEY,
    Code NVARCHAR(80) NOT NULL UNIQUE,
    Name NVARCHAR(120) NOT NULL,
    Description NVARCHAR(500) NULL,
    Weight INT NOT NULL,
    ThresholdValue DECIMAL(18,2) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT CK_FraudRules_Weight
        CHECK (Weight BETWEEN 1 AND 100)
);
GO

-- =========================
-- Transactions
-- =========================
CREATE TABLE Transactions (
    TransactionId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    AccountId INT NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Currency NVARCHAR(10) NOT NULL DEFAULT 'GTQ',
    Merchant NVARCHAR(120) NOT NULL,
    MerchantCategory NVARCHAR(80) NOT NULL,
    Channel NVARCHAR(30) NOT NULL,
    DeviceId NVARCHAR(100) NULL,
    IpAddress NVARCHAR(45) NULL,
    Country NVARCHAR(80) NULL,
    TransactionDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    Status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',

    CONSTRAINT FK_Transactions_Accounts
        FOREIGN KEY (AccountId) REFERENCES Accounts(AccountId),

    CONSTRAINT CK_Transactions_Amount
        CHECK (Amount > 0),

    CONSTRAINT CK_Transactions_Channel
        CHECK (Channel IN ('WEB', 'MOBILE', 'POS', 'ATM')),

    CONSTRAINT CK_Transactions_Status
        CHECK (Status IN ('PENDING', 'APPROVED', 'APPROVED_WITH_MONITORING', 'REVIEW_REQUIRED', 'HELD', 'REJECTED'))
);
GO

-- =========================
-- Fraud Evaluations
-- =========================
CREATE TABLE FraudEvaluations (
    EvaluationId INT IDENTITY(1,1) PRIMARY KEY,
    TransactionId UNIQUEIDENTIFIER NOT NULL,
    RiskScore INT NOT NULL,
    RiskLevel NVARCHAR(20) NOT NULL,
    TriggeredRules NVARCHAR(MAX) NULL,
    EvaluatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Evaluations_Transactions
        FOREIGN KEY (TransactionId) REFERENCES Transactions(TransactionId),

    CONSTRAINT CK_Evaluations_RiskScore
        CHECK (RiskScore BETWEEN 0 AND 100),

    CONSTRAINT CK_Evaluations_RiskLevel
        CHECK (RiskLevel IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))
);
GO

-- =========================
-- Fraud Alerts
-- =========================
CREATE TABLE FraudAlerts (
    AlertId INT IDENTITY(1,1) PRIMARY KEY,
    TransactionId UNIQUEIDENTIFIER NOT NULL,
    AssignedToUserId INT NULL,
    RiskScore INT NOT NULL,
    RiskLevel NVARCHAR(20) NOT NULL,
    Status NVARCHAR(30) NOT NULL DEFAULT 'NEW',
    Reason NVARCHAR(500) NOT NULL,
    AnalystComment NVARCHAR(1000) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ResolvedAt DATETIME2 NULL,

    CONSTRAINT FK_Alerts_Transactions
        FOREIGN KEY (TransactionId) REFERENCES Transactions(TransactionId),

    CONSTRAINT FK_Alerts_Users
        FOREIGN KEY (AssignedToUserId) REFERENCES Users(UserId),

    CONSTRAINT CK_Alerts_Status
        CHECK (Status IN ('NEW', 'REVIEWING', 'RESOLVED', 'DISCARDED')),

    CONSTRAINT CK_Alerts_RiskLevel
        CHECK (RiskLevel IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))
);
GO

-- =========================
-- Audit Logs
-- =========================
CREATE TABLE AuditLogs (
    AuditLogId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL,
    Action NVARCHAR(120) NOT NULL,
    EntityName NVARCHAR(120) NOT NULL,
    EntityId NVARCHAR(100) NULL,
    Description NVARCHAR(1000) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_AuditLogs_Users
        FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- =========================
-- Indexes
-- =========================
CREATE INDEX IX_Transactions_AccountId
ON Transactions(AccountId);
GO

CREATE INDEX IX_Transactions_Date
ON Transactions(TransactionDate);
GO

CREATE INDEX IX_FraudAlerts_Status
ON FraudAlerts(Status);
GO

CREATE INDEX IX_FraudAlerts_RiskLevel
ON FraudAlerts(RiskLevel);
GO

CREATE INDEX IX_FraudEvaluations_RiskLevel
ON FraudEvaluations(RiskLevel);
GO

-- =========================
-- Seed Data
-- =========================

INSERT INTO Roles (Name, Description)
VALUES
('Admin', 'Gestiona usuarios, reglas, configuración y auditoría.'),
('Analyst', 'Revisa alertas, consulta transacciones y actualiza estados.'),
('Supervisor', 'Supervisa alertas críticas, valida decisiones del analista y revisa reportes.'),
('Viewer', 'Solo puede visualizar dashboard, transacciones y reportes.');
GO

INSERT INTO Users (RoleId, FullName, Email, PasswordHash)
VALUES
(1, 'Administrador SentinelPay', 'admin@sentinelpay.local', 'HASH_TEMPORAL_CAMBIAR'),
(2, 'Analista de Riesgo', 'analyst@sentinelpay.local', 'HASH_TEMPORAL_CAMBIAR'),
(3, 'Usuario Consulta', 'viewer@sentinelpay.local', 'HASH_TEMPORAL_CAMBIAR');
GO

INSERT INTO Customers (FullName, Email, Phone, Country, RiskLevel)
VALUES
('Carlos Méndez', 'carlos.mendez@test.com', '5555-0001', 'Guatemala', 'LOW'),
('María López', 'maria.lopez@test.com', '5555-0002', 'Guatemala', 'MEDIUM'),
('José Ramírez', 'jose.ramirez@test.com', '5555-0003', 'Guatemala', 'HIGH');
GO

INSERT INTO Accounts (CustomerId, AccountNumber, AccountType, Balance, Currency)
VALUES
(1, 'GT-000001', 'SAVINGS', 15000.00, 'GTQ'),
(2, 'GT-000002', 'CHECKING', 8500.00, 'GTQ'),
(3, 'GT-000003', 'SAVINGS', 25000.00, 'GTQ');
GO

INSERT INTO FraudRules (Code, Name, Description, Weight, ThresholdValue)
VALUES
('AMOUNT_ABOVE_CUSTOMER_AVERAGE', 'Monto inusual', 'El monto supera significativamente el promedio histórico del cliente.', 25, 5000),
('VELOCITY_LAST_10_MINUTES', 'Velocidad de transacciones', 'Muchas operaciones en una ventana corta de tiempo.', 20, 3),
('NEW_DEVICE', 'Dispositivo nuevo', 'La operación se realiza desde un dispositivo no registrado previamente.', 15, NULL),
('UNUSUAL_COUNTRY', 'País inusual', 'La operación proviene de una ubicación distinta al patrón normal del cliente.', 15, NULL),
('HIGH_RISK_MERCHANT', 'Comercio de alto riesgo', 'La categoría del comercio tiene mayor riesgo simulado.', 10, NULL),
('UNUSUAL_HOUR', 'Horario inusual', 'La operación ocurre en una franja poco común para el cliente.', 10, NULL),
('RECENT_FAILED_ATTEMPTS', 'Intentos fallidos recientes', 'Existen eventos de login fallido cercanos a la operación.', 15, NULL);
GO