Months = {
    ['01'] = 'Oca',
    ['02'] = 'Şub',
    ['03'] = 'Mar',
    ['04'] = 'Nis',
    ['05'] = 'May',
    ['06'] = 'Haz',
    ['07'] = 'Tem',
    ['08'] = 'Ağu',
    ['09'] = 'Eyl',
    ['10'] = 'Eki',
    ['11'] = 'Kas',
    ['12'] = 'Ara',
}

QBCore = exports['qb-core']:GetCoreObject()


function getSeconds(date)
    day,month, year = string.match(date, "(%d+).(%d+).(%d+)")
    zamanke = os.time{year=year, month=month, day=day}
    return zamanke
end


function convertSeconds(date)
    day,month, year = string.match(date, "(%d+).(%d+).(%d+)")
    local difference = os.difftime(os.time{year=year, month=month, day=day},os.time())
    return difference
end


function getMonth(date)
    day,month, year = string.match(date, "(%d+).(%d+).(%d+)")
    return month

end

function getDay(date)
    day,month, year = string.match(date, "(%d+).(%d+).(%d+)")
    return day

end


--[[
    title,
    day,
    kisaltma,
    kisadesc,
    bglink,
    uzundesc,
    tamtarih,
    toplamsaniye,
    organize
]]

--- GPSSSSSSSSS

QBCore.Functions.CreateCallback('poyetkinlik:hepsi', function(source, cb)
    tablo = {}
    local Player = QBCore.Functions.GetPlayer(source)
    exports['ghmattimysql']:execute('SELECT * FROM etkinlikler ORDER BY tamsaniye DESC',{}, function(result)
        for i=1, #result do
            print(getSeconds(result[i].tamtarih))
            local tarih = result[i].tamtarih
            local ay = getMonth(tarih)
            table.insert(tablo, {
                title = result[i].title,
                organize = result[i].organisator,
                desc = result[i].kisadesc,
                uzundesc = result[i].uzundesc,
                link = result[i].bglink,
                tamtarih = result[i].tamtarih,
                toplamsaniye = convertSeconds(tarih),
                saat = result[i].saat,
                kisaltma = Months[ay],
                day = getDay(result[i].tamtarih),
                gps = result[i].location,
            })
        end

        cb(tablo)
    
    
    end)

end)

QBCore.Functions.CreateCallback('poyetkinlik:getname', function(source, cb)
    tabled = {}
    local Player = QBCore.Functions.GetPlayer(source)
    local adminmi = false
    name = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
    local id = ""
    local discord = ""
    identifiers = GetNumPlayerIdentifiers(source)
    for i = 0, identifiers + 1 do
        if GetPlayerIdentifier(source, i) ~= nil then
            if string.match(GetPlayerIdentifier(source, i), "discord") then
                discord = GetPlayerIdentifier(source, i)
                id = string.sub(discord, 9, -1)
                exports['discordroles']:isRolePresent(id, {'959555356730728451'} --[[ can be a table or just a string. ]], function(hasRole)
                    table.insert(tabled,{
                        name = name,
                        admin = hasRole,
                    })
                    print(hasRole)
                    cb(tabled)
                end)
            end
        end
    end
    
    
   
    --[[exports['discordroles']:isRolePresent(user, '969980263197204541', function(hasRole)
        if hasRole then
            adminmi = true
        end
        
    end)]]--


end)

RegisterServerEvent('poyetkinlik:insert', function(title, link, uzun, tarih, saat, organize, lokasyon, kisa)
    exports['ghmattimysql']:execute('INSERT INTO etkinlikler(title, organisator, kisadesc, uzundesc, bglink, saat, tamtarih, location, tamsaniye) VALUES (@title, @organize, @kisa, @uzun, @link, @saat, @tam, @loka, @saniye)', {
        ['@title'] = title,
        ['@organize'] = organize,
        ['@kisa'] = kisa, 
        ['@uzun'] = uzun,
        ['@link'] = link, 
        ['@saat'] = saat, 
        ['@tam'] = tarih,
        ['@loka'] = lokasyon,
        ['@saniye'] = getSeconds(tarih), 
    }, function(result)

    
    end)
    TriggerClientEvent('QBCore:Notify', source, 'Etkinlik Eklendi.', 'success')
end)

