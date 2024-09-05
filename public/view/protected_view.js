export async function protectedView() {
    const response = await fetch('/view/templates/portected_page_template.html',
        {cache: 'no-store'}
    );
    return await response.text();
}