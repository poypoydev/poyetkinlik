QBCore = exports['qb-core']:GetCoreObject()
RegisterCommand('takvim', function()
    QBCore.Functions.TriggerCallback('poyetkinlik:getname', function(result)
        for i=1, #result do
            ad = result[i].name
            adminmi = result[i].admin
        end
        print(adminmi)
        SendNUIMessage({
            show = true,
            name = ad,
            admin = adminmi,
        })
    end)
    SetNuiFocus(true, true)

end)

RegisterNUICallback('kapat', function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('setgps', function(data,cb)
    SetNewWaypoint(data.x, data.y)
    SetNuiFocus(false, false)

end)



RegisterNUICallback('eventekle', function(data,cb)
    TriggerServerEvent('poyetkinlik:insert', data.ad, data.link, data.uzundesc, data.tamtarihi, data.saat, data.orginasator, data.vector, data.kisadesc)
    
end)


RegisterNUICallback('hepsi', function(data,cb)
    QBCore.Functions.TriggerCallback('poyetkinlik:hepsi', function(hepsi)
        cb(hepsi)
    
    end)
end)


RegisterNUICallback('gps', function(data, cb)
    local lokasyon = data.data
    print(lokasyon)
    off = bol(lokasyon, " ")
    print(off[1], off[2], off[3])
    xtonum = tonumber(off[1])
    ytonum = tonumber(off[2])
    ztonum = tonumber(off[3])
    local newloc = vector3(xtonum, ytonum, ztonum)
    if xtonum == nil or ytonum == nil or ztonum == nil then
        QBCore.Functions.Notify('GPS Belirtilmemiş!', 'error')
    else
        QBCore.Functions.Notify('GPS Lokasyonu İşaretlendi!', 'success')
        SetNewWaypoint(newloc)
    end


end)

function bol(s, delimiter)
    result = {};
    for aynen in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, aynen);
    end
    return result;
end

