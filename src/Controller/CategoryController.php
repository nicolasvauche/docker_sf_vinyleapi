<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/category', name: 'app_category_')]
class CategoryController extends AbstractController
{
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->json($categoryRepository->findAll(), 200, [], ['groups' => 'category:read']);
    }

    #[Route('', name: 'add', methods: ['POST'])]
    public function add(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, CategoryRepository $categoryRepository): Response
    {
        try {
            $category = $serializer->deserialize($request->getContent(), Category::class, 'json');

            $errors = $validator->validate($category);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            $categoryRepository->add($category);

            return $this->json($category, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }

    }
}
