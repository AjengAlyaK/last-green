const fireInit = {
    apiKey: "AIzaSyAvoE2J3KOZI_fRpk-NMtVQjAQ9ttHZi74",
    authDomain: "green-ee85d.firebaseapp.com",
    projectId: "green-ee85d",
    storageBucket: "green-ee85d.appspot.com",
    messagingSenderId: "568400099014",
    appId: "1:568400099014:web:e367f112230088d93f49c7",
    measurementId: "G-LJWPZYY3HN"
};

// Initialize client-side Firebase
if (!getApps().length) {
    initializeApp(fireInit);
} else {
    getApp();
}

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "green-ee85d",
        "private_key_id": "66a10e457481dd64b74cb1cd69aa31448a7976ab",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4CenyZVTCTN0Y\ncTIFRwNt7+X2oQWpkmkxWX0udeGO/t1qAOq/dDjMZUq0xhL4vSmbez4YSDzESrvs\na9hST1lSPnPK91uxhrWFXRPWeoDrSgnaBUi5M7vCfnJ+m0bxpJ9cBrlEC+4l4uj1\nseqQstwe9mBPdOleyFIjXIAjjAoF6RQMX+nRQV1U+hTBX0eU3hYxCN3eNClgRswf\nRw94zRvj2MNlfch34WiPzFRVlUF39h7L4Bi7iT9FTQvEwjiAtunnVKPheoK3/1/n\nT7xW98omrWtbiXv1ZgGG7v1AWVvoX48y7TceSvras5CD9rAZLITeG+hmddpdPhEH\nsoPRv5l/AgMBAAECggEAGOCHhf4KN9zW/XZTpMtQHIdom5lxiqtMBTaLtCuNarHA\nhpM1fYgSzheabRbh5UtV+U/upAP5FC7mpH3WzG2FwpccOjaMklHbbfnCdDleqC97\nvG5UFxYgo8Oe63FG5OQerHxg2mC4d4OVf5y7UIWfjp85g+lm9ap4u+dFj53e6aRi\nwl8UyoxitvgGTW37rdGqndVMyXt5nqvgmDLpT6Zo0NIuLPYZ70lWU5mbJgu0lk2W\nZ2OowCE6t+AWQ074hQ0m7+5F2ZUZBT/MEJIvaDFpMo99kydGJVJeQ1cuFhZ7ynuQ\nzynqOWfO2Bw/pzMJsOAgCE/Y5D2bcegvTylHlkjf0QKBgQD9uc+fhixfs+rzdhsM\nv1uFMa6mIDaSgawsereAsaQZaNHl7q6wk85iE/wK++d6JNazlRwoV9ZGNyF9pGay\nPDu5Ss8nxxAKIMBvmUdEPXcYCy+145E85PFxiGx4AICuvtyAhyK0Z2ZiqbjME4Ok\nxtC8TkQ/hMAjrXioN7hEE9v7jwKBgQC5sDOexGYr1z1+T+9UfIibng0p0J89fBUI\nDExu0LlJjXpl8t5TTs9OGobPzVnXZD6Qhr9jbrljQtPQG5Kwu2efJIvoClJGoFMz\njHz+tqdaufI66z4C31VohgSGFt4PSQnmaPB5zf7ohQpSNoI/YilIVIJfMd4GfzH1\nGc3F5v9LEQKBgCF6Dbnnkx1BeOOMlr8U1Hd7eaazo1+rOlNYEbQqPBOaL++dkXD8\n34MzTdMJL55/E9D4AJIWHNCA36tbMK2douesxi5iZmxfq+RNngiT7429lBr0nqoh\nLvYi4OTodBIaXq+apOqWpfyolhhfDsSD8vCVhw22bz+F2OChEW/yCtljAoGAEmH3\nOkiHNN/iHpcbQmnxvDYxZ2pX2WZnTpypFG9laHqxG1an2+d5bmoB3qCdvE0YRIaS\ne+2CPOlovrl8FDL5Vy/vCdG7w3IrynamCTFb8Adoi5yuTup9MhPSbtPkt+6rJDxP\nUj+qdKp3ExyCWHQHUjnLjlEJgeslrvYXAPiVXYECgYEAvuVwqg2gcw+M/XLwxJGf\nIMKyD66fRdPU9MmN7cj0A0VmVvs728rbYlxGXiBZgaD3amFRpMoQeqlArQlgPGQt\nRRPiqNj3I2yjGonaTEnvnYun07Cet7Uejvc6X1S3rFXF5U3l9dDJj77dCFmc6Jt4\nBFmZ119fMa7Q66DUQWoXMcg=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-pqcea@green-ee85d.iam.gserviceaccount.com",
        "client_id": "100753832903180909097",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pqcea%40green-ee85d.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }),
});