#!/usr/bin/env python3
# encoding=utf8

""" Script for extracting amenitiy latitude,longitude
    from OSM GeoJSON file """

import json
import csv
from amenity import Amenity

# get ECHO definied amenity types
with open('./created_data/echo_amenity_types.json') as f:
    amenity_types = json.load(f)

# get data from OSM json data
# data tagged with 'amenity'
with open('./downloaded_data/ma_amenities_data.json') as f:
    amenity_data = json.load(f)
amenity_data = amenity_data['features']

# data tagged with 'leisure'
with open('./downloaded_data/ma_leisure_data.json') as f:
    leisure_data = json.load(f)
leisure_data = leisure_data['features']

# data tagged with 'shop'
with open('./downloaded_data/ma_shop_data.json') as f:
    shop_data = json.load(f)
shop_data = shop_data['features']

# data extraction
amenities_data = [amenity_data, leisure_data, shop_data]
osm_sec_feats = ['amenity', 'leisure', 'shop']
for i in range(3):
    temp_data = amenities_data[i]
    osm_feat = osm_sec_feats[i]
    for d in temp_data:
        # get amenity type and subtype
        tipo = d['properties'][osm_feat]
        sub_tipo = ''
        if not tipo in amenity_types:
            for t in amenity_types:
                if tipo in amenity_types[t]:
                    sub_tipo = tipo
                    tipo = t
                    break

        add_to_dataset = True
        # get id
        try:
            _id = int(d["id"][5:])
        except:
            add_to_dataset = False
    
        # get name
        try:
            name = d['properties']['name']
        except:
            pass

        # get lat and long
        try:
            (latitude, longitude) = d['geometry']['coordinates']
        except:
            add_to_dataset = False

        # get address
        # addr:postcode, addr: state, addr:city, addr:street, addr:housenumber
        address = {}
        try:
            address['postcode'] = d['properties']['addr:postcode']
        except:
            pass
        try:
            address['state'] = d['properties']['addr:state']
        except:
            pass
        try:
            address['city'] = d['properties']['addr:city']
        except:
            pass
        try:
            address['street'] = d['properties']['addr:street']
        except:
            pass
        try:
            address['housenumber'] = d['properties']['addr:housenumber']
        except:
            pass
        
        # get opening_hours
        try:
            hours = d['properties']['opening_hours']
        except:
            pass

        # get wheelchair accesibility
        try:
            wheelchair = d['properties']['wheelchair']
        except:
            pass

        # get website
        try:
            website = d['properties']['website']
        except:
            pass

        # get description
        try:
            description = d['properties']['description']
        except:
            pass

        # get denomination -> religion for place_of_worship
        religion = {}
        if sub_tipo == "place_of_worship":
            try:
                religion['denomination'] = d['properties']['denomination']
            except:
                pass
            try:
                religion['religion'] = d['properties']['religion']
            except:
                pass

        # get yes / no emergency for hospital
        emergency = ''
        if sub_tipo == "hospital":
            try:
                emergency = d['properties']['emergency']
            except:
                pass

        # insantiating Amenity datastructure
        # TODO
        

            

# code for getting count data
# amenities = {}
# for f in amenity_data:
#     amenity = f['properties']['amenity']
#     if amenity in amenities:
#         amenities[amenity] += 1
#     else:
#         amenities[amenity] = 1

# for f in leisure_data:
#     amenity = f['properties']['leisure']
#     if amenity in amenities:
#         amenities[amenity] += 1
#     else:
#         amenities[amenity] = 1

# for f in shop_data:
#     amenity = f['properties']['shop']
#     if amenity in amenities:
#         amenities[amenity] += 1
#     else:
#         amenities[amenity] = 1



# print(amenities)

# with open('./created_data/amenity_count.csv', 'w', newline='') as csvfile:
#     fieldnames = ['amenity']
#     writer = csv.writer(csvfile)
#     for a in amenities:
#         writer.writerow([a, amenities[a]])
    
    