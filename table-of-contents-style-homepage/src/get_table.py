#!/usr/bin/env python
import requests
HEADERS = {'Authorization' : 'Bearer key1agtUnabRLb2LS'}
BASE_URL = 'https://api.airtable.com/v0/appj3UWymNh6FgtGR/'
VIEW = 'view=Grid%20view'

PLACE_TABLE_NAME = 'Help%20Services'
PLACE_TABLE_VAR = 'placesTableCached'
PLACE_TABLE_MAP = {
    'name' : 'Name',
    'nameSpanish' : 'Name-ES',
    'catSubcatId' : 'CatSubcat',
    'city' : 'City',
    'category' : 'Category',
    'subcategory' : 'Subcategory',
    'phone' : 'Phone Number',
    'address' : 'Physical Address',
    'latitude' : 'Latitude',
    'longitude' : 'Longitude',
    'url' : 'Web address',
    'email' : 'Email Address',
    'hours' : 'Hours of operation',
    'description' : 'Description',
    'wheelchair' : 'Wheelchair access (y)',
    'languageHelp' : 'Language Help (y)'
}

CATEGORY_TABLE_NAME = 'Categories'
CATEGORY_TABLE_VAR = 'categoryTableCached'
CATEGORY_TABLE_MAP = {
      'name' : 'Name',
      'nameSpanish' : 'Name-ES',
      'subcategories' : 'Subcategories',
}

SUBCATEGORY_TABLE_NAME = 'Subcategories'
SUBCATEGORY_TABLE_VAR = 'subcategoryTableCached'
SUBCATEGORY_TABLE_MAP = {
      'categoryId' : 'Category',
      'name' : 'Name',
      'nameSpanish' : 'Name-ES',
}

CATSUBCAT_TABLE_NAME = 'CatSubcats'
CATSUBCAT_TABLE_VAR = 'catSubcatTableCached'
# Cat Subcat handled specially, so doesn't use table map.
CATSUBCAT_TABLE_MAP = {}

CITY_TABLE_NAME = 'Cities'
CITY_TABLE_VAR = 'cityTableCached'
CITY_TABLE_MAP = {
      'name' : 'Name',
}

def make_record(record_in, key_pairs):
    record_out = {}
    record_out["id"] = record_in["id"]
    for key in key_pairs:
        new_key = key
        old_key = key_pairs[new_key]
        record_out[new_key] = ''
        if old_key in record_in['fields']:
            record_out[new_key] = record_in['fields'][old_key]
    return record_out

def make_record_catsubcat(record_in):
    catSubcatId = record_in["id"]
    catSubcatName = record_in['fields']['Name']
    categoryId = record_in['fields']['Category'][0]

    subcategoryId = ''
    subcategoryName = ''
    subcategoryNameSpanish = ''
    if 'Subcategory' in record_in['fields']:
        subcategoryId = record_in['fields']['Subcategory'][0]
        subcategoryName = record_in['fields']['SubcategoryString'][0]
        subcategoryNameSpanish = record_in['fields']['Subcategory-ES'][0]

    record_out = {
      'catSubcatId': catSubcatId,
      'catSubcatName': catSubcatName,
      'categoryId' : categoryId,
      'subcategoryId' : subcategoryId,
      'name' : subcategoryName,
      'nameSpanish' : subcategoryNameSpanish,
      'places' : []
    }
    return record_out

#     let subcategoryId = record.get('Subcategory');
#     let subcategoryName;
#     let subcategoryNameSpanish;
#     if (subcategoryId) {
#       subcategoryId = subcategoryId[0];
#       subcategoryName = record.get('SubcategoryString')[0];
#       subcategoryNameSpanish = record.get('Subcategory-ES')[0];
#     } else {
#       subcategoryName = '';
#       subcategoryNameSpanish = '';
#     }
#     return {
#       'catSubcatId': catSubcatId,
#       'catSubcatName': catSubcatName,
#       'categoryId' : categoryId,
#       'subcategoryId' : subcategoryId,
#       'name' : subcategoryName,
#       'nameSpanish' : subcategoryNameSpanish,
#       'places' : []
#     };
#   });

def table_map(table_name, table_raw, key_pairs):
    if table_name == CATSUBCAT_TABLE_NAME:
        table = map(lambda record: make_record_catsubcat(record), table_raw)
    else:
        table = map(lambda record: make_record(record, key_pairs), table_raw)
    table = list(table)
    return table

def get_page(url):
    r = requests.get(url, headers=HEADERS)
    data = r.json()
    records = data['records']
    offset = None
    if 'offset' in data:
        offset = data['offset']
    return records, offset

def do_table(table_name, mapping, var_name, f):
    # get the table data from air table
    table_url = BASE_URL+table_name
    page, offset = get_page(table_url+'?'+VIEW)
    table_raw = page
    while offset:
        page, offset = get_page(table_url+'?offset='+offset+'&'+VIEW)
        table_raw.extend(page)
    # map it into the form we need
    table = table_map(table_name, table_raw, mapping)
    # write it into the javascript file
    print('const', var_name, '=', table, ';', file=f)

f = open('cachedInlineTables.js', 'w')
do_table(PLACE_TABLE_NAME, PLACE_TABLE_MAP, PLACE_TABLE_VAR, f)
do_table(CATEGORY_TABLE_NAME, CATEGORY_TABLE_MAP, CATEGORY_TABLE_VAR, f)
do_table(SUBCATEGORY_TABLE_NAME, SUBCATEGORY_TABLE_MAP, SUBCATEGORY_TABLE_VAR, f)
do_table(CATSUBCAT_TABLE_NAME, CATSUBCAT_TABLE_MAP, CATSUBCAT_TABLE_VAR, f)
do_table(CITY_TABLE_NAME, CITY_TABLE_MAP, CITY_TABLE_VAR, f)