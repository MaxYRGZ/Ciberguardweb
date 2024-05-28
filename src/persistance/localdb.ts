import { open, Database } from 'sqlite';

export default class LocalDB {
    static async connect() {
        return open({
            filename: 'ciberguard.db',
            driver: Database,
        });
    }

    static async init() {
        const db = await LocalDB.connect();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS cuenta (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                correo TEXT NOT NULL,
                contraseña TEXT NOT NULL
            )
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS contrasenas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                contraseña TEXT NOT NULL,
                fecha_creacion DATE NOT NULL
            )
        `);

        // Llenar la tabla de contrasenas con datos aleatorios
        await this.fillPasswordsTable(db);
    }

    static async fillPasswordsTable(db: Database) {
        await db.run('DELETE FROM contrasenas'); // Limpiar la tabla antes de llenarla

        const passwords = [
            { nombre: 'Facebook', contraseña: 'fbpass' },
            { nombre: 'Gmail', contraseña: 'gmailpass' },
            { nombre: 'Twitter', contraseña: 'twitterpass' },
            // Agrega más datos si es necesario
        ];

        const currentDate = new Date();
        const lastSixMonths = new Date();
        lastSixMonths.setMonth(currentDate.getMonth() - 6);

        const insertPromises = passwords.map(async (password) => {
            // Generar una fecha aleatoria en los últimos 6 meses
            const randomDate = new Date(
                lastSixMonths.getTime() + Math.random() * (currentDate.getTime() - lastSixMonths.getTime())
            );

            await db.run(
                'INSERT INTO contrasenas (nombre, contraseña, fecha_creacion) VALUES (?, ?, ?)',
                [password.nombre, password.contraseña, randomDate.toISOString()]
            );
        });

        await Promise.all(insertPromises);
    }
}
