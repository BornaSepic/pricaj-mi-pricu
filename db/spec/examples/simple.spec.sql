-- Start transaction and plan the tests.
begin;

select plan(1);

-- Run the tests.
select pass('Example test assertion');

-- Finish the tests and clean up.
select *
  from finish();

rollback;
