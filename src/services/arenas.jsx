import { supabase } from "./supabaseClient";

export async function getEmpreendimentos() {
    const { data, error } = await supabase
        .from("owner_profiles") // <-- nome da sua tabela de empreendimentos
        .select("*");

    if (error) {
        console.error("Erro ao buscar empreendimentos:", error);
        throw error;
    }

    console.log(data);
    return data;
}

export async function getArenaData(slug) {
    const { data, error } = await supabase
        .from("owner_profiles")
        .select("*")
        .eq("slug", slug);

    if (error) {
        console.error("Erro ao buscar empreendimentos:", error);
        throw error;
    }

 //   console.log(data[0]);
    
    return data[0]; // Retorna o primeiro resultado
}

export async function getCourtsData(id) {
    const { data, error } = await supabase
        .from("owner_courts")
        .select("*")
        .eq("user_id", id);

    if (error) {
        console.error("Erro ao buscar empreendimentos:", error);
        throw error;
    }

//    console.log(data);

    return data;
}

export async function getAvailability(id, dayOfWeek) {
    const { data, error } = await supabase
        .from("owner_availability")
        .select("*")
        .eq("court_id", id)
        .eq("day_of_week", dayOfWeek);

    if (error) {
        console.error("Erro ao buscar empreendimentos:", error);
        throw error;
    }

    console.log(data);

    return data;
}
