import db from "../database";

export const searchClientsQuery = db.prepare(`
	SELECT
	id,	
	full_name
	FROM clients
	WHERE full_name LIKE @query;
	`);

export const searchCarsQuery = db.prepare(`
	SELECT
	*
	FROM cars
	WHERE name LIKE @query OR serial_number LIKE @query OR registration_number LIKE @query
	`);

export const searchLicencesQuery = db.prepare(`
	SELECT
	id,
	serial_number,
	moudjahid
	FROM licences
	WHERE moudjahid LIKE @query OR serial_number LIKE @query
	`);

export const searchProcurationsQuery = db.prepare(`
	SELECT
	procurations.id,
	procurations.notary,
	cars.owner_name AS moudjahid,
	( cars.name || ' (' || cars.serial_number || ')' ) AS car
	FROM procurations
	INNER JOIN cars ON cars.id = procurations.car_id
	WHERE moudjahid LIKE @query OR car LIKE @query OR notary LIKE @query
	`);

export const searchPapersQuery = db.prepare(`
	SELECT
	papers.id,
 	( cars.name || ' (' || cars.serial_number || ')' ) AS car
	FROM papers
	INNER JOIN cars ON cars.id = papers.car_id
	WHERE car LIKE @query
	`);
