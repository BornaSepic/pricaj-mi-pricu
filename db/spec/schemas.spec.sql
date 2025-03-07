begin;

select plan(1);

select schemas_are(array ['app_private', 'app_public', 'graphile_worker', 'public'], 'should have four schemas');

select *
  from finish();

rollback;
