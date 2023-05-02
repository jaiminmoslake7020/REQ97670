const request = require("supertest");
const app = require("../app");
const { expect, beforeAll } = require('@jest/globals');
const { setupTables } = require("../db/db");
const positionTypes = require("./data/position-types.json");
const positions = require("./data/positions.json");
const staff = require("./data/staff.json");

describe("All Tests", () => {

  beforeAll(async () => {
     await setupTables();
  });

    test("Create Director PositionType", async () => {
        let body = {
            "title": "Director",
            "level": 0
        };
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(body).expect(200);
        expect(res.body).toBeTruthy();
        const positionTypeId = res.body.id;
        console.log('level', res.body);

        console.log('pt1', {...body, positionTypeId});
        const res1 = await request(app)
            .post("/position")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...body, positionTypeId}).expect(200);
        expect(res1.body).toBeTruthy();
    });

    test("Create Senior Manager PositionType", async () => {
        let body = {
            "title": "Senior Manager",
            "level": 1
        };
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(body).expect(200);
        expect(res.body).toBeTruthy();
        const positionTypeId = res.body.id;
        console.log('level', res.body);

        console.log('pt1', {...body, positionTypeId});
        const res1 = await request(app)
            .post("/position")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...body, positionTypeId}).expect(200);
        expect(res1.body).toBeTruthy();
    });

    test("Create Senior Manager PositionType", async () => {
        let body = {
            "title": "Manager",
            "level": 2
        };
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(body).expect(200);
        expect(res.body).toBeTruthy();
        const positionTypeId = res.body.id;
        console.log('level', res.body);

        console.log('pt1', {...body, positionTypeId});
        const res1 = await request(app)
            .post("/position")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...body, positionTypeId}).expect(200);
        expect(res1.body).toBeTruthy();
    });

    test("Create Senior Developer PositionType", async () => {
        let body = {
            "title": "Senior Developer",
            "level": 3
        };
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(body).expect(200);
        expect(res.body).toBeTruthy();
        const positionTypeId = res.body.id;
        console.log('level', res.body);

        console.log('pt1', {...body, positionTypeId});
        const res1 = await request(app)
            .post("/position")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...body, positionTypeId}).expect(200);
        expect(res1.body).toBeTruthy();
    });

    test("Create Junior Developer PositionType", async () => {
        let body = {
            "title": "Junior Developer",
            "level": 4
        };
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(body).expect(200);
        expect(res.body).toBeTruthy();
        const positionTypeId = res.body.id;
        console.log('level', res.body);

        console.log('pt1', {...body, positionTypeId});
        const res1 = await request(app)
            .post("/position")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...body, positionTypeId}).expect(200);
        expect(res1.body).toBeTruthy();
    });

  //   test("Create PositionTypes", async () => {
  //     const p = positionTypes.map(async (pt) => {
  //         const res = await request(app)
  //             .post("/position-type")
  //             .set('Content-Type', 'application/json')
  //             .set('Accept', 'application/json')
  //             .send(pt).expect(200);
  //         expect(res.body).toBeTruthy();
  //         const level = res.body.level;
  //         const positionTypeId = res.body.id;
  //         console.log('level', res.body);
  //
  //         const pt1 = positions.filter((d) => d.level === level);
  //         const title = pt1[0]['title'];
  //         console.log('pt1', {...pt1[0], positionTypeId});
  //
  //         expect(pt1[0]).toBeTruthy();
  //         const res1 = await request(app)
  //             .post("/position")
  //             .set('Content-Type', 'application/json')
  //             .set('Accept', 'application/json')
  //             .send({title, positionTypeId}).expect(200);
  //         expect(res1.body).toBeTruthy();
  //
  //         await timer(500); // then the created Promise can be awaited
  //     });
  //     await Promise.all(p);
  // });
  //
    test("Director PositionType Again Should Fail", async () => {
        const res = await request(app)
            .post("/position-type")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(positionTypes[0]).expect(500);
    });

  {/* User Story 1 */}
  test("Get All PositionType", async () => {
        const res = await request(app)
            .get("/position-type")
            .expect(200);

        expect(res.body).toBeTruthy();
    });

    // test("Create Positions", async () => {
    //     const p = positions.map(async (pt) => {
    //         const res = await request(app)
    //             .post("/position")
    //             .set('Content-Type', 'application/json')
    //             .set('Accept', 'application/json')
    //             .send(pt).expect(200);
    //         expect(res.body).toBeTruthy();
    //     });
    //     await Promise.all(p);
    // });

    test("Get All Positions", async () => {
        const res = await request(app)
            .get("/position")
            .expect(200);
        expect(res.body).toBeTruthy();
        res.body.forEach((p) => {
            expect(p.staffId).toBeNull();
            expect(p.staff).toBeNull();
        })
    });

    {/* User Story 5 */}
    test("Fill All Positions", async () => {
        const p = staff.map(async ({positionId, staff}) => {
            const res = await request(app)
                .post("/position/fill/"+positionId)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(staff).expect(200);
            expect(res.body).toBeTruthy();
        });
        await Promise.all(p);
    });

    test("Get All Positions After Filling it", async () => {
        const res = await request(app)
            .get("/position")
            .expect(200);

        expect(res.body).toBeTruthy();

        res.body.forEach((p) => {
            expect(p.staffId).toBeTruthy();
            expect(p.staff).toBeTruthy();
            expect(p.staff.id).toBeTruthy();
        })
    });

    {/* User Story 3 */}
    test("Remove An Employee", async () => {
        const res = await request(app)
            .post("/position/remove-employee/3")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send().expect(200);
        expect(res.body).toBeTruthy();
        expect(res.body.staffId).toBeNull();
    });

    test("Get Removed Employee Position", async () => {
        const res = await request(app)
            .get("/position/3")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(staff).expect(200);
        expect(res.body).toBeTruthy();
        expect(res.body.staffId).toBeNull();
        expect(res.body.staff).toBeNull();
    });

    {/* User Story 1 */}
    test("Get All Positions Again", async () => {
        const res = await request(app)
            .get("/position")
            .expect(200);

        expect(res.body).toBeTruthy();

        res.body.forEach((p) => {
            if (p.id !== 3) {
                expect(p.staffId).toBeTruthy();
                expect(p.staff).toBeTruthy();
                expect(p.staff.id).toBeTruthy();
            } else {
                expect(p.staffId).toBeFalsy();
                expect(p.staff).toBeFalsy();
            }
        })
    });

    {/* User Story 4 */}
    test("addDescentdantEmployeePosition", async () => {
        const res = await request(app)
            .post("/position/add-descendant/3")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                staff: {
                    firstName: 'Jaikant',
                    lastName: 'Sikre'
                },
                position: {
                    "title": "Goa CM",
                }
            }).expect(200);
        expect(res.body).toBeTruthy();
        expect(res.body.staffId).toBeTruthy();
    });

    {/* User Story 1 */}
    test("Get All Positions Again 3", async () => {
        const res = await request(app)
            .get("/position")
            .expect(200);

        expect(res.body).toBeTruthy();

        res.body.forEach((p) => {
            if (p.id !== 3) {
                expect(p.staffId).toBeTruthy();
                expect(p.staff).toBeTruthy();
                expect(p.staff.id).toBeTruthy();
            } else {
                expect(p.staffId).toBeFalsy();
                expect(p.staff).toBeFalsy();
            }
        })

        console.log('res.body', res.body);
    });


    {/* User Story 2 */}
    test("Update Staff", async () => {
        const res = await request(app)
            .put("/staff/4")
            .send({
                firstName: "Kristina",
                lastName: "cox"
            })
            .expect(200);

        expect(res.body.firstName === "Kristina" ).toBeTruthy();
        expect(res.body.lastName === "cox" ).toBeTruthy();
        expect(res.body.id === 4 ).toBeTruthy();
    });

});
