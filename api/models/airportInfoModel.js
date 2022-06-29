const db = require("../db/db");

const getAirportInfoByID = (id) => {
    return new Promise((resolve, reject) => {
        var sql =
            "SELECT airportLevelDetailID,levelID,value FROM `airportleveldetail`  WHERE airport_id=? AND status=1;"
        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
};

const addAirportInfo = (airportInfo) => {
    return new Promise((resolve, reject) => {
        if (!airportInfo?.airportName || !airportInfo?.infoArray) return reject(new Error("BadRequest"));

        db.beginTransaction((err) => {
            if (err) { return reject(err) }

            db.query("INSERT INTO `airport` (name,status) VALUES (?,1);", [airportInfo.airportName], function (err1, result1) {
                if (err1) {
                    db.rollback(() => {
                        return reject(err1);
                    });
                    return;
                }

                db.query('SElECT airport_id from `airport` WHERE name=? AND status=1', [airportInfo.airportName], async function (err2, result2) {
                    if (err2) {
                        db.rollback(function () {
                            return reject(err2);
                        });
                        return;
                    }
                    if (result2.length == 1) {
                        const airport_id = result2[0].airport_id;

                        for (let i = 0; i < airportInfo.infoArray.length; i++) {
                            try {
                                var success = await new Promise((resolve1, reject1) => {
                                    db.query('INSERT INTO airportleveldetail (airport_id,levelID, value,status) VALUES (?,?,?,1)', [airport_id, ...airportInfo.infoArray[i]], function (err3, result3) {
                                        if (err3) {
                                            console.log("AKAFADS");
                                            db.rollback();
                                            return reject1(false);
                                        }
                                        resolve1(true);
                                    });
                                });
                                if (success) continue;
                            }
                            catch (err) {
                                success = false;
                                break;
                            }
                        }

                        if (success) {
                            db.commit(function (err4) {
                                if (err4) {
                                    db.rollback(function () {
                                        return reject(err4);
                                    });
                                }
                                return resolve();
                            });
                        } else {
                            reject(new Error("ErrorWhileIntertingToAirportLevelDetail"))
                        }

                    } else {
                        db.rollback();
                        return reject(new Error("AirportAlreadyExists"))
                    }

                });

            });
        });

    });
};


const updateAirportInfo = (airportInfo) => {
    return new Promise((resolve, reject) => {
        if (!airportInfo?.airport_id || !airportInfo?.infoArray) return reject(new Error("BadRequest"));

        db.query("SELECT * FROM `airportleveldetail` WHERE airport_id=? AND status=1", [airportInfo.airport_id], (err0, result0) => {
            if (err0) {
                return reject(err0);
            }
            
            if (result0.length > 0) {
                db.beginTransaction( (err1) => {
                    if (err1) return reject(err1);

                    db.query("UPDATE `airportleveldetail` SET status=0 WHERE airport_id=?;", [airportInfo.airport_id], async (err2, result2) => {
                        if (err2) {
                            db.rollback();
                            return reject(err2);
                        }

                        for (let i = 0; i < airportInfo.infoArray.length; i++) {
                            try {
                                var success = await new Promise((resolve1, reject1) => {
                                    db.query('UPDATE `airportleveldetail` SET levelID=?,value=?,status=1 WHERE airportLevelDetailID=?;', [...airportInfo.infoArray[i]], function (err3, result3) {
                                        if (err3) {
                                            console.log(err3);
                                            db.rollback();
                                            return reject1(false);
                                        }
                                        resolve1(true);
                                    });
                                });
                                if (success) continue;
                            }
                            catch (err) {
                                success = false;
                                break;
                            }
                        }

                        if (success) {
                            db.commit(function (err4) {
                                if (err4) {
                                    db.rollback(function () {
                                        return reject(err4);
                                    });
                                }
                                return resolve();
                            });
                        } else {
                            return reject(new Error("ErrorWhileUpdatingAirportInfo"));
                        }


                    });

                });
            }
        });

    });
};

module.exports = { addAirportInfo, getAirportInfoByID,updateAirportInfo }