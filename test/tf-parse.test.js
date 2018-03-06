'use strict';
const fs = require('fs');
const debug = require('debug')('tfparse/test');
const _ = require('lodash');

const tfParse = require('../lib');
const Plan = tfParse.Plan;
const Apply = tfParse.Apply;
const State = tfParse.State;

describe('lib', function() {
    describe('Plan', function() {
        it('should return a new object', function() {
            const plan = new Plan();
            expect(plan).toBeInstanceOf(Plan);
        });
        it('should have a parse method', function() {
            const plan = new Plan();
            expect(_.isFunction(plan.parse)).toBeTruthy();
        });
    });
    describe('Plan parsing', function() {
        let context = {};
        beforeAll(function() {
            context.data = fs.readFileSync( `${__dirname}/data/plan/plan.txt`, 'utf8' );
            context.plan = new Plan();
        });
        it('should parse a plan.txt to an object', function() {
            const p = context.plan.parse(context.data );
            expect(_.isObject(p)).toBeTruthy();
        });
    });
    describe('Parsing results', function() {
        describe('Handle delete cases', function() {
            describe("bar", () => {
                let context = {};
                beforeAll(function() {
                    context.data = fs.readFileSync( `${__dirname}/data/plan/no-hash-node.txt`, 'utf8' );
                    context.plan = new Plan();
                    context.result = context.plan.parse( context.data );
                });
                it('should have add, rep, mod, del properties', function() {
                    expect(context.result).toHaveProperty('add');
                    expect(context.result).toHaveProperty('rep');
                    expect(context.result).toHaveProperty('mod');
                    expect(context.result).toHaveProperty('del');
                });
                it('should have a del key of type object', function() {
                    expect( _.isObject(context.result.del)).toBeTruthy();
                });
                it('should have a del key with keys aws_autoscaling_group and aws_launch_configuration', function() {
                    expect( context.result.del).toHaveProperty('aws_autoscaling_group');
                    expect( context.result.del).toHaveProperty('aws_launch_configuration');
                });
                it('should have a aws_autoscaling_group.XYZ_Application_AutoscaleGroup key', function() {
                    expect(context.result.del.aws_autoscaling_group).toHaveProperty('XYZ_Application_AutoscaleGroup');
                });
                it('should have a aws_launch_configuration.XYZ_Application_LaunchConfiguration key', function() {
                    expect(context.result.del.aws_launch_configuration).toHaveProperty('XYZ_Application_LaunchConfiguration');
                });
            })
        });
        
        
        describe('foo', () => {
            let context = {};
            beforeAll(function() {
                context.data = fs.readFileSync( `${__dirname}/data/plan/plan.txt`, 'utf8' );
                context.plan = new Plan();
                context.result = context.plan.parse( context.data );
            });
            describe('aws_ebs_volume type', function() {
                it('should have an add aws_ebs_volume property', function() {
                    expect(context.result.add).toHaveProperty( 'aws_ebs_volume' );
                });
                it('should have an add aws_ebs_volume.XYZ_XMDXYZA1006_Application_sdf property', function() {
                    expect(context.result.add.aws_ebs_volume).toHaveProperty( 'XYZ_XMDXYZA1006_Application_sdf' );
                });
                it('aws_ebs_volume instance should have an add encrypted property', function() {
                    expect(context.result.add.aws_ebs_volume.XYZ_XMDXYZA1006_Application_sdf).toHaveProperty( 'encrypted' );
                });
                it('aws_ebs_volume encrypted property should be a boolean', function() {
                    expect(_.isBoolean(context.result.add.aws_ebs_volume.XYZ_XMDXYZA1006_Application_sdf.encrypted)).toBeTruthy();
                });
            });
            describe('aws_instance type', function() {
                it('should have an add aws_instance property', function() {
                    expect(context.result.add).toHaveProperty( 'aws_instance' );
                });
                it('should have an add aws_instance.XYZ_XMDXYZA1006 property', function() {
                    expect(context.result.add.aws_instance).toHaveProperty( 'XYZ_XMDXYZA1006' );
                });
                it('aws_instance instance should have an add encrypted property', function() {
                    expect(context.result.add.aws_instance.XYZ_XMDXYZA1006).toHaveProperty( 'private_ip' );
                });
                it('aws_instance encrypted property should be a boolean', function() {
                    expect(context.result.add.aws_instance.XYZ_XMDXYZA1006.private_ip).toEqual( '10.237.2.144' );
                });
            });
        })
        
    });
    describe('Apply', function() {
        it('should return a new object', function() {
            const apply = new Apply();
            expect(apply).toBeInstanceOf(Apply);
        });
        it('should have a parse method', function() {
            const apply = new Apply();
            expect(_.isFunction(apply.parse)).toBeTruthy();
        });
        describe('Parsing results', function() {
            let context = {};
            beforeAll( function() {
                context.data = fs.readFileSync( `${__dirname}/data/apply/db/apply.txt`, 'utf8' );
                context.apply = new Apply();
                context.result = context.apply.parse( context.data );
            });
            it('should have an add property', function() {
                expect(context.result).toHaveProperty('add');
            });
            it('should have an add key with keys aws_db_subnet_group and aws_db_instance', function() {
                expect( context.result.add ).toHaveProperty('aws_db_subnet_group');
                expect( context.result.add ).toHaveProperty('aws_db_instance');
            });
            it('should have 6 aws_db_subnet_group keys', function() {
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1026_subnet_group');
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1027_subnet_group');
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1028_subnet_group');
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1029_subnet_group');
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1030_subnet_group');
                expect( context.result.add.aws_db_subnet_group ).toHaveProperty('xyz_pudxyzd1031_subnet_group');
            });
            it('should have 6 aws_db_instance keys', function() {
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1026');
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1027');
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1028');
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1029');
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1030');
                expect(context.result.add.aws_db_instance).toHaveProperty( 'xyz_pudxyzd1031');
            });
        });
    });



    describe('State', function() {
        it('should return a new object', function() {
            const state = new State();
            expect(state).toBeInstanceOf(State);
        });
        it('should have a parse method', function() {
            const state = new State();
            expect(_.isFunction(state.parse)).toBeTruthy();
        });
        it('should throw an error if a string is passed that isn\'t proper JSON', function() {
            const state = new State();
            expect( function() { state.parse('{') } ).toThrow(SyntaxError);
        });
        it('should not throw an error if a string is passed that is proper JSON', function() {
            const state = new State();
            expect( function() { state.parse('{}') } ).not.toThrow(SyntaxError);
        });
        it('should not throw an error if a Object is passed', function() {
            const state = new State();
            expect( function() { state.parse( {} ) } ).not.toThrow(SyntaxError);
        });
        it('should throw an error if an unsupported state file version is passed', function() {
            const state = new State();
            expect( function() { state.parse( { version : 4 } ) } ).toThrow(/unsupported/i);
        });

        describe('Parsing results', function() {
            let context = {};
            beforeAll( function() {
                context.data = fs.readFileSync( `${__dirname}/data/apply/db/terraform.tfstate`, 'utf8' );
                context.state = new State();
                context.result = context.state.parse( context.data );
                debug( '%j', context.result );
            });
            it('should have a resource property', function() {
                expect(context.result).toHaveProperty('resource');
            });
            it('should have only resources', function() {
                expect(context.result).toHaveProperty('resource');
            });
            it('should not have any data or module resources', function() {
                expect(context.result.resource).not.toHaveProperty('data');
                expect(context.result.resource).not.toHaveProperty('module');
            });
            it('should have aws_db_instance, aws_db_subnet_group, aws_eb_volume, aws_instance, aws_s3_bucket, aws_volume_attachment resources', function() {
                expect(context.result.resource).toHaveProperty("aws_db_instance")
                expect(context.result.resource).toHaveProperty("aws_db_subnet_group")
                expect(context.result.resource).toHaveProperty("aws_ebs_volume")
                expect(context.result.resource).toHaveProperty("aws_instance")
                expect(context.result.resource).toHaveProperty("aws_s3_bucket")
                expect(context.result.resource).toHaveProperty("aws_volume_attachment")
            });
            it('should have 6 aws_db_instance objects', function() {
                expect(Object.keys( context.result.resource.aws_db_instance )).toHaveLength( 6 );
            });
            it('should have 6 aws_db_subnet_group objects', function() {
                expect(Object.keys( context.result.resource.aws_db_subnet_group )).toHaveLength( 6 );
            });
            it('should have aws_db_subnet_group.xyz_pudxyzd1026_subnet_group object', function() {
                expect( _.isObject(context.result.resource.aws_db_subnet_group.xyz_pudxyzd1026_subnet_group )).toBeTruthy();
            });
            it('should have aws_db_subnet_group.xyz_pudxyzd1026_subnet_group.subnet_ids array', function() {
                expect( _.isArray(context.result.resource.aws_db_subnet_group.xyz_pudxyzd1026_subnet_group.subnet_ids) ).toBeTruthy();
            });
            it('should have aws_db_subnet_group.xyz_pudxyzd1026_subnet_group.subnet_ids array of length 2', function() {
                expect( context.result.resource.aws_db_subnet_group.xyz_pudxyzd1026_subnet_group.subnet_ids ).toHaveLength( 2 );
            });
        });
    });


});

